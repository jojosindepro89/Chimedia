import Link from "next/link";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white uppercase">Manage Posts</h1>
                <Link href="/admin/posts/new" className="bg-primary text-black font-bold uppercase px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No posts found. Create your first post.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                                                {post.featuredImage ? (
                                                    <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FileText className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-bold text-white line-clamp-1">{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{post.category?.name || 'Uncategorized'}</td>
                                    <td className="p-4 text-gray-400 text-sm hidden md:table-cell">Admin</td>
                                    <td className="p-4 text-gray-500 text-sm whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/posts/${post.id}/edit`} className="p-2 hover:bg-white/10 rounded text-blue-400 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <form action={deletePost.bind(null, post.id)}>
                                                <button className="p-2 hover:bg-white/10 rounded text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
