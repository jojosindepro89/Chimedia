import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
        include: { category: true }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/posts" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Posts
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white uppercase">Edit Post</h1>
            </div>

            <EditPostForm post={post} />
        </div>
    );
}
