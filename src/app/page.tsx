import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const products = await prisma.product.findMany();

  async function addToCart(data: FormData) {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/signin");
    }

    await prisma.cart.update({
      where: { id: session.user.cartId },
      data: {
        products: {
          connect: {
            id: data.get("id") as string,
          },
        },
      },
    });

    redirect("/cart");
  }

  return (
    <main className="grid min-h-screen items-center justify-between p-24 grid-cols-2 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>SKU: {product.sku}</CardDescription>
          </CardHeader>
          <CardFooter>
            <form action={addToCart}>
              <input
                name="id"
                type="text"
                className="hidden"
                value={product.id}
                readOnly
              />
              <Button type="submit">Add to Cart</Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
}
