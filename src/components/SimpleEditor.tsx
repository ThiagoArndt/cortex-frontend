import { useCallback } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import FeatherIcon from "feather-icons-react";
import Placeholder from "@tiptap/extension-placeholder";

interface SimpleEditorInterface {
  handleAddComment: (comment: string) => Promise<any>;
}

export function SimpleEditor({ handleAddComment }: Readonly<SimpleEditorInterface>) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      Placeholder.configure({
        emptyNodeClass: "text-red-700",
        placeholder: "Escreva algo …",
      }),
    ],
  }) as Editor;

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <div className="menu flex gap-2 mb-2">
        <button
          className="menu-button p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <FeatherIcon size={15} icon="rotate-ccw" />
        </button>
        <button
          className="menu-button p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <FeatherIcon size={15} icon="rotate-cw" />
        </button>

        <button
          className={`menu-button p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
          onClick={toggleBold}
        >
          <FeatherIcon size={15} icon="bold" />
        </button>
        <button
          className={`menu-button p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
          onClick={toggleUnderline}
        >
          <FeatherIcon size={15} icon="underline" />
        </button>
        <button
          className={`menu-button p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
          onClick={toggleItalic}
        >
          <FeatherIcon size={15} icon="italic" />
        </button>
        <button
          className={`menu-button p-2 rounded hover:bg-gray-200 ${
            editor.isActive("code") ? "bg-gray-300" : ""
          }`}
          onClick={toggleCode}
        >
          <FeatherIcon size={15} icon="code" />
        </button>
      </div>
      <div className="flex flex-row w-full items-end justify-end">
        <EditorContent className="w-[95%] !outline-none !border-none" editor={editor} />
        <div
          role="presentation"
          className="cursor-pointer"
          onClick={async () => {
            const content = editor.getHTML();
            await handleAddComment(content);
            editor.commands.clearContent();
          }}
        >
          <FeatherIcon icon="send" size={20} className="text-light-grey w-6" />
        </div>
      </div>
    </div>
  );
}
