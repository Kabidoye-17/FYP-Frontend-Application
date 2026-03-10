import styled from "styled-components";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const Wrapper = styled(NodeViewWrapper)`
    position: relative;
    margin: 1rem 0;
`;

const LanguageLabel = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25rem 0.5rem;
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--text-secondary);
    background-color: var(--section-background);
    border-radius: 0 8px 0 4px;
`;

const Pre = styled.pre`
    background-color: var(--text-primary);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;

    code {
        font-family: "SF Mono", Monaco, Consolas, monospace;
        font-size: 0.8125rem;
        color: var(--white);
        line-height: 1.6;
    }
`;

function CodeBlock({ node }: NodeViewProps) {
    const language = node.attrs.language ?? "text";

    return (
        <Wrapper>
            <LanguageLabel contentEditable={false}>{language}</LanguageLabel>
            <Pre>
                <code>
                    <NodeViewContent />
                </code>
            </Pre>
        </Wrapper>
    );
}

export default CodeBlock;
