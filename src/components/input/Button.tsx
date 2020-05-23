import * as React from "react"
import styled from "styled-components"
import theme from "~/theme"

type ButtonType = "default" | "primary" | "warning" | "danger"

interface Props {
    type: ButtonType,
    disabled?: boolean
    onClick?: () => void
    children?: React.ReactChildren | string
}

export function Button({ type, onClick, children}: Props) {
    return (
        <Container
            type={type}
            onClick={onClick}
        >
            {children || null}
        </Container>
    )
}

const Container = styled.div<Props>`
  width: fit-content;
  height: 32px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  box-sizing: content-box;
  padding: 0 24px 0 24px;
  border-radius: 6px;
  
  color: ${(props) => theme.get(`button-${props.type}-text`)};
  background-color: ${(props) => theme.get(`button-${props.type}-background`)};
  text-shadow: ${(props) => theme.get(`button-${props.type}-textShadow`)};
  
  transition: box-shadow 0.25s;
  
  &:hover {
    box-shadow: ${(props) => theme.get(`button-${props.type}-shadow`)};
  }
`