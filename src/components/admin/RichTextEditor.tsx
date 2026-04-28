"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect } from "react";
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
    Highlighter, Heading1, Heading2, Heading3, Quote, Minus,
    Undo, Redo
} from "lucide-react";
import clsx from "clsx";

interface RichTextEditorProps {
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

export default function RichTextEditor({ name, defaultValue = "", placeholder = "Write your prediction analysis here..." }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight.configure({ multicolor: false }),
            TextStyle,
            Color,
        ],
        content: defaultValue || `<p></p>`,
        editorProps: {
            attributes: {
                class: "min-h-[280px] p-5 text-white focus:outline-none prose prose-invert max-w-none text-sm leading-relaxed",
            },
        },
    });

    useEffect(() => {
        if (editor && defaultValue) {
            editor.commands.setContent(defaultValue);
        }
    }, [defaultValue]);

    const ToolbarButton = ({ onClick, active, title, children }: any) => (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            title={title}
            className={clsx(
                "p-1.5 rounded transition-all",
                active
                    ? "bg-primary text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
            )}
        >
            {children}
        </button>
    );

    const Divider = () => <div className="w-px h-5 bg-white/10 mx-1" />;

    if (!editor) return null;

    return (
        <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-black/40 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            {/* Hidden input that syncs HTML content for form submission */}
            <input type="hidden" name={name} value={editor.getHTML()} onChange={() => {}} />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                {/* Undo/Redo */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="w-3.5 h-3.5" />
                </ToolbarButton>
                <Divider />

                {/* Headings */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
                    <Heading1 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
                    <Heading2 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
                    <Heading3 className="w-3.5 h-3.5" />
                </ToolbarButton>
                <Divider />

                {/* Text formatting */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
                    <Bold className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
                    <Italic className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
                    <UnderlineIcon className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
                    <Strikethrough className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">
                    <Highlighter className="w-3.5 h-3.5" />
                </ToolbarButton>
                <Divider />

                {/* Alignment */}
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
                    <AlignLeft className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
                    <AlignCenter className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
                    <AlignRight className="w-3.5 h-3.5" />
                </ToolbarButton>
                <Divider />

                {/* Lists */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
                    <List className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
                    <ListOrdered className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
                    <Quote className="w-3.5 h-3.5" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider Line">
                    <Minus className="w-3.5 h-3.5" />
                </ToolbarButton>
            </div>

            {/* Editor area */}
            <div onClick={() => editor.commands.focus()} className="cursor-text relative">
                {editor.isEmpty && (
                    <p className="absolute top-5 left-5 text-gray-700 text-sm pointer-events-none select-none">
                        {placeholder}
                    </p>
                )}
                <EditorContent editor={editor} />
            </div>

            {/* Word count */}
            <div className="flex items-center justify-end px-4 py-2 border-t border-white/[0.04]">
                <span className="text-gray-700 text-[11px] font-mono">
                    {editor.storage.characterCount?.words?.() ?? editor.getText().trim().split(/\s+/).filter(Boolean).length} words
                </span>
            </div>
        </div>
    );
}
