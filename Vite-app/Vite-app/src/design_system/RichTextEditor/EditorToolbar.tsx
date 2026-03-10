import styled from "styled-components";
import type { Editor } from "@tiptap/react";
import Icon from "../Icon";

interface EditorToolbarProps {
    editor: Editor | null;
}

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
`;

const Divider = styled.div`
    width: 1px;
    height: 24px;
    background-color: var(--border-color);
    margin: 0 0.25rem;
`;

const ToolbarButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background-color: ${({ $active }) =>
        $active ? "var(--purple-light)" : "transparent"};
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${({ $active }) =>
            $active ? "var(--purple-light)" : "var(--hover-background)"};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

function EditorToolbar({ editor }: Readonly<EditorToolbarProps>) {
    if (!editor) return null;

    return (
        <Toolbar>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                $active={editor.isActive("bold")}
                title="Bold (⌘B)"
            >
                <Icon
                    name="TextB"
                    size={18}
                    color={editor.isActive("bold") ? "var(--purple)" : "var(--text-primary)"}
                    weight="bold"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                $active={editor.isActive("italic")}
                title="Italic (⌘I)"
            >
                <Icon
                    name="TextItalic"
                    size={18}
                    color={editor.isActive("italic") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                $active={editor.isActive("strike")}
                title="Strikethrough"
            >
                <Icon
                    name="TextStrikethrough"
                    size={18}
                    color={editor.isActive("strike") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                $active={editor.isActive("code")}
                title="Inline code"
            >
                <Icon
                    name="Code"
                    size={18}
                    color={editor.isActive("code") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                $active={editor.isActive("heading", { level: 1 })}
                title="Heading 1"
            >
                <Icon
                    name="TextHOne"
                    size={18}
                    color={editor.isActive("heading", { level: 1 }) ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                $active={editor.isActive("heading", { level: 2 })}
                title="Heading 2"
            >
                <Icon
                    name="TextHTwo"
                    size={18}
                    color={editor.isActive("heading", { level: 2 }) ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                $active={editor.isActive("bulletList")}
                title="Bullet list"
            >
                <Icon
                    name="ListBullets"
                    size={18}
                    color={editor.isActive("bulletList") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                $active={editor.isActive("orderedList")}
                title="Numbered list"
            >
                <Icon
                    name="ListNumbers"
                    size={18}
                    color={editor.isActive("orderedList") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                $active={editor.isActive("blockquote")}
                title="Quote"
            >
                <Icon
                    name="Quotes"
                    size={18}
                    color={editor.isActive("blockquote") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                $active={editor.isActive("codeBlock")}
                title="Code block"
            >
                <Icon
                    name="CodeBlock"
                    size={18}
                    color={editor.isActive("codeBlock") ? "var(--purple)" : "var(--text-primary)"}
                    weight="regular"
                />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (⌘Z)"
            >
                <Icon name="ArrowCounterClockwise" size={18} color="var(--text-primary)" weight="regular" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (⌘⇧Z)"
            >
                <Icon name="ArrowClockwise" size={18} color="var(--text-primary)" weight="regular" />
            </ToolbarButton>
        </Toolbar>
    );
}

export default EditorToolbar;
