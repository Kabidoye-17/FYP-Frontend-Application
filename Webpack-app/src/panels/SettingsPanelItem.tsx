import styled from "styled-components";

export const ItemContainer = styled.div`
    width: 40rem;
    height: 70px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    padding-left: 2em;
    border: 1px solid var(--text-secondary);

`;


export const ItemTopContainer = styled.div`
    height: 40%
    color: var(--light-plum);

    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    padding-top: 0.6em;
`;

export const ItemBottomContainer = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
`;
export const ItemLeftBottomContainer = styled.div`
    height: 60%;
    width: 35rem;
    color: var(--text-secondary);
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: .8rem;
    
`;

export const ItemRightBottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 1em;
    padding-right: 3em;
`;
