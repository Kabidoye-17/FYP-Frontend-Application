import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import styled from "styled-components";
import EditorToolbar from "./EditorToolbar";
import EditorBubbleMenu from "./EditorBubbleMenu";

interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    minHeight?: string;
    editable?: boolean;
}

const Container = styled.div`
    border: 1px solid var(--border-color);
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--white);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus-within {
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }
`;

const EditorWrapper = styled.div<{ $minHeight: string }>`
    padding: 1rem;
    min-height: ${({ $minHeight }) => $minHeight};

    .ProseMirror {
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 0.9375rem;
        line-height: 1.6;
        color: var(--text-primary);

        > * + * {
            margin-top: 0.75em;
        }

        p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: var(--text-tertiary);
            pointer-events: none;
            height: 0;
        }

        h1 {
            font-size: 1.5rem;
            font-weight: 700;
        }

        h2 {
            font-size: 1.25rem;
            font-weight: 600;
        }

        h3 {
            font-size: 1.125rem;
            font-weight: 600;
        }

        ul,
        ol {
            padding-left: 1.5rem;
        }

        ul {
            list-style-type: disc;
        }

        ol {
            list-style-type: decimal;
        }

        blockquote {
            border-left: 3px solid var(--purple);
            padding-left: 1rem;
            margin-left: 0;
            color: var(--text-secondary);
            font-style: italic;
        }

        code {
            font-family: "SF Mono", Monaco, Consolas, monospace;
            font-size: 0.875em;
            background-color: var(--section-background);
            padding: 0.125rem 0.375rem;
            border-radius: 4px;
        }

        pre {
            background-color: var(--text-primary);
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;

            code {
                background: none;
                padding: 0;
                color: var(--white);
                font-size: 0.8125rem;
            }
        }

        a {
            color: var(--purple);
            text-decoration: underline;
            cursor: pointer;
        }

        hr {
            border: none;
            border-top: 1px solid var(--border-color);
            margin: 1.5rem 0;
        }
    }
`;

function RichTextEditor({
    content = "",
    onChange,
    placeholder = "Write something...",
    minHeight = "150px",
    editable = true,
}: Readonly<RichTextEditorProps>) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                "data-placeholder": placeholder,
            },
        },
    });

    return (
        <Container>
            {editable && <EditorToolbar editor={editor} />}
            <EditorWrapper $minHeight={minHeight}>
                <EditorBubbleMenu editor={editor} />
                <EditorContent editor={editor} />
            </EditorWrapper>
        </Container>
    );
}

export default RichTextEditor;
