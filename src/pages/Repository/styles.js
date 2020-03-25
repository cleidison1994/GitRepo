import styled from "styled-components";

export const Loading = styled.div`
    color: #FFF;
    font-size: 30px;
    font-weight:bold;
    display:flex;
    justify-content:center;
    align-items:center;
    height: 100vh;

`;
export const Owner = styled.header`
    display:flex;
    flex-direction: column;
    align-items: center;

    a {
        text-decoration: none;
        color: #7159c1;
        font-size: 16px;
    }

    img {
        width:120px;
        border-radius:50%;
        margin-top: 20px;
    }
    h1 {
        font-size: 24px;
        margin-top: 10px;
    }
    p {
        margin-top: 5px;
        font-size: 1 4px;
        color:#666;
        line-height:1.4;
        text-align: center;
        max-width: 400px;
    }

`;
export const IssueList = styled.ul`
    padding-top:30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 10px 15px;
        border: 1px solid #eee;
        border-radius: 4px;

        & +  li {
        margin-top: 10px
    }
    }


    img {
        width:36px;
        height:36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex:1;
        margin-left:15px;

        strong {
            font-size: 16px;

            a {
                text-decoration: none;
                color: #333;

                &:hover {
                    color: #7159c1;
                }
            }
            span {
                background: #eee;
                color:#333;
                font-size: 12px;
                font-weight:600;
                height: 20px;
                padding: 3px 4px;
                margin-left: 10px;
            }
        }
        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;
 export const PageButton = styled.div`
    margin-top:30px;
    display:flex;
    justify-content:space-between;
    align-items:center;

    button {
        color:#FFF;
        padding:10px;
        background:#7159c1;
        border-radius: 10px;
        border: 0;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

`;
export const IssueState = styled.div`
    margin-bottom:20px;
    display:flex;
    justify-content: center;

    button {
        color: #FFF;
        margin-right: 3px;
        border: 0;
        border-radius:5px;
        padding: 0 10px;
        background:#7159c1;

        &:nth-child(${props => props.active + 1}) {
      background: #576574;
      color: white;
    }
  }
`;
