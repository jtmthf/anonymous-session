import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const cart = await prisma.cart.findUnique({
    where: { id: session.user.cartId },
    include: {
      products: true,
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
