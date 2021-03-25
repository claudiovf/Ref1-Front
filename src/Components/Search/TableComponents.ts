import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    max-width: 100vw;
    height: auto;
    margin: 2rem 0 1rem 0;
    padding: 1rem;
`;

export const Tbody = styled.tbody`
    max-width: 100vw;
`;  

export const Th = styled.th`
    font-family: "Work Sans Semi Bold";
    color: #2F2f2f;
    padding: 0.25rem 0;
    font-size: 0.75rem;
`;

export const Td = styled.td`
    font-family: "Work Sans Bold";
    color: #2F2F2F;
    padding: 0.25rem 0;
    font-size: 1rem;
`;
export const Tr = styled.tr`
    & ${Th}:nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        
    }
     ${Th}:nth-child(1) {
         color: #FFFFFF;
    }
     ${Th}:nth-child(4) {
         color: #BEBEBE;
    }
     ${Td}:nth-child(4) {
        color: #BEBEBE;
    }
    
`;

export const Rank = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 0.25rem;
`;

export const TableCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.25rem 0.5rem;
    max-width: 14rem;
    & span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;    
    }
`;