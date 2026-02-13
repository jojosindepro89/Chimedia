"use client";

import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { useActionState } from "react";
import { createPost } from "@/app/actions";

const initialState = {
    message: '',
}

export default function NewPostPage() {
    const [state, formAction] = useActionState(createPost, initialState);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/posts" className="bg-zinc-800 p-2 rounded-full text-white hover:bg-zinc-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white uppercase">Create New Post</h1>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-sm p-8">
                <form action={formAction} className="space-y-8">
                    {/* Title */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Post Title</label>
                        <input name="title" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-lg font-bold" placeholder="Enter title here..." required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Category */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Category</label>
                            <select name="category" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none" required>
                                <option value="Premier League">Premier League</option>
                                <option value="La Liga">La Liga</option>
                                <option value="Champions League">Champions League</option>
                                <option value="Transfer News">Transfer News</option>
                            </select>
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Slug (URL)</label>
                            <input name="slug" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="post-title-slug" required />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Featured Image</label>
                        <input type="file" name="image" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" accept="image/*" />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Content</label>
                        <textarea name="content" rows={15} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-mono" placeholder="Write your post content here... (Markdown supported)" required></textarea>
                    </div>

                    {state?.message && (
                        <p className="text-red-500 text-sm font-bold">{state.message}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                        <Link href="/admin/posts" className="px-6 py-3 text-gray-400 font-bold uppercase hover:text-white transition-colors">
                            Cancel
                        </Link>
                        <button type="submit" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                            <Save className="w-4 h-4" /> Publish Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
