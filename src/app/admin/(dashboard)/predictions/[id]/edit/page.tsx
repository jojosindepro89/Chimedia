import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditPredictionForm from "./EditPredictionForm";

export default async function EditPredictionPage({ params }: { params: { id: string } }) {
    const prediction = await prisma.prediction.findUnique({
        where: { id: params.id }
    });

    if (!prediction) {
        notFound();
    }

    return <EditPredictionForm prediction={prediction} />;
}
