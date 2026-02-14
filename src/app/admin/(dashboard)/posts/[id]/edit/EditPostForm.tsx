"use client";

import { updatePost } from "@/app/actions";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { useActionState } from "react";

const initialState = {
    message: '',
}

export default function EditPostForm({ post }: { post: any }) {
    // Modify updatePost signature in actions.ts or wrap it here to match (state, formData)
    // actions.ts updatePost signature: (id: string, formData: FormData) -> this is for direct action
    // But useActionState expects (state, payload)
    // We need to bind the ID.

    // updatePost needs to be compatible with useActionState: (state: any, formData: FormData) => Promise<any>
    // Currently updatePost is (id: string, formData: FormData)
    // We can change updatePost or use a wrapper.
    // Let's rely on bind working if we update action signature or use a wrapper.

    // Actually, let's update actions.ts to be (id: string, prevState: any, formData: FormData) for consistency?
    // Or just (prevState: any, formData: FormData) and we include ID in formData or bind it.

    const updatePostWithId = updatePost.bind(null, post.id);
    const [state, formAction] = useActionState(updatePostWithId, initialState);

    return (
        <form action={formAction} className="space-y-6 bg-zinc-900 border border-white/10 p-8 rounded-sm">
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

            {state?.message && (
                <p className="text-red-500 text-sm font-bold">{state.message}</p>
            )}

            <div className="pt-4 flex justify-end">
                <button type="submit" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    <Save className="w-5 h-5" /> Update Post
                </button>
            </div>
        </form>
    );
}
