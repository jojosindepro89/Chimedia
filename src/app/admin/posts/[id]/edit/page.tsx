import { prisma } from "@/lib/prisma";
import { updatePost } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { notFound } from "next/navigation";

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

            <form action={updatePost.bind(null, post.id)} className="space-y-6 bg-zinc-900 border border-white/10 p-8 rounded-sm">

                {/* Title */}
                <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Post Title</label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={post.title}
                        required
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="e.g. Manchester City vs Liverpool"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Slug (URL)</label>
                    <input
                        name="slug"
                        type="text"
                        defaultValue={post.slug}
                        required
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="e.g. man-city-vs-liverpool"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Category</label>
                    <select
                        name="category"
                        defaultValue={post.category?.name || "Premier League"}
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    >
                        <option value="Premier League">Premier League</option>
                        <option value="La Liga">La Liga</option>
                        <option value="Champions League">Champions League</option>
                        <option value="Serie A">Serie A</option>
                        <option value="Bundesliga">Bundesliga</option>
                        <option value="Transfer News">Transfer News</option>
                    </select>
                </div>

                {/* Featured Image */}
                <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Featured Image</label>
                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group mb-2">
                        <ImageIcon className="w-8 h-8 text-gray-500 mx-auto mb-2 group-hover:text-primary transition-colors" />
                        <span className="text-sm text-gray-500 group-hover:text-white transition-colors">Click to upload new image</span>
                        <input name="image" type="file" className="hidden" accept="image/*" />
                    </div>
                    {post.featuredImage && (
                        <div className="text-xs text-gray-500">
                            Current: <a href={post.featuredImage} target="_blank" className="text-primary hover:underline">View Image</a>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Content (Markdown)</label>
                    <textarea
                        name="content"
                        rows={10}
                        defaultValue={post.content}
                        required
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                        placeholder="# Heading..."
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                        <Save className="w-5 h-5" /> Update Post
                    </button>
                </div>
            </form>
        </div>
    );
}
