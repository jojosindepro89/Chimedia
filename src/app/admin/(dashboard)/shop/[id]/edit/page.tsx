import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProductEditForm from "@/components/admin/ProductEditForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        redirect("/admin/shop");
    }

    return <ProductEditForm product={product} />;
}
