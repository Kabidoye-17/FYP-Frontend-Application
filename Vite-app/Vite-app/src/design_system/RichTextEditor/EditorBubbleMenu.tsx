import styled from "styled-components";
import type { Editor } from "@tiptap/react";
import Icon from "../Icon";

interface EditorBubbleMenuProps {
    editor: Editor | null;
}

const Menu = styled.div`
    display: flex;
    align-items: center;
    gap: 0.125rem;
    padding: 0.375rem;
    background-color: var(--text-primary);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const MenuButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: ${({ $active }) =>
        $active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
`;

const Divider = styled.div`
    width: 1px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 0.25rem;
`;

// Note: BubbleMenu is available in @tiptap/react/menus
// This component provides the menu content that can be used within a BubbleMenu
function EditorBubbleMenu({ editor }: Readonly<EditorBubbleMenuProps>) {
    if (!editor) return null;

    return (
        <Menu>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                $active={editor.isActive("bold")}
            >
                <Icon name="TextB" size={16} color="var(--white)" weight="bold" />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                $active={editor.isActive("italic")}
            >
                <Icon name="TextItalic" size={16} color="var(--white)" weight="regular" />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                $active={editor.isActive("strike")}
            >
                <Icon name="TextStrikethrough" size={16} color="var(--white)" weight="regular" />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                $active={editor.isActive("code")}
            >
                <Icon name="Code" size={16} color="var(--white)" weight="regular" />
            </MenuButton>
            <Divider />
            <MenuButton
                onClick={() => {
                    const url = window.prompt("Enter URL:");
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                $active={editor.isActive("link")}
            >
                <Icon name="Link" size={16} color="var(--white)" weight="regular" />
            </MenuButton>
        </Menu>
    );
}

export default EditorBubbleMenu;
