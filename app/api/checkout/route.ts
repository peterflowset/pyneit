import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  quantity: z.number().int().min(1).max(99),
});

export async function POST(request: Request) {
  try {
    const stripePriceId = process.env.STRIPE_PRICE_ID_930;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!stripePriceId || !siteUrl) {
      return NextResponse.json(
        { error: "Server checkout configuration is incomplete" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { quantity } = checkoutSchema.parse(body);

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: stripePriceId,
          quantity,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["IT", "AT", "DE"],
      },
      success_url: `${siteUrl}/de/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/de/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
