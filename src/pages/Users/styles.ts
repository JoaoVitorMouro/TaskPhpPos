import { styled } from 'styled-components'

export const UsersContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 1 1.5rem;
`

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const TransactionsButton = styled.button`
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
`

export const EditButton = styled.button`
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['green-500']};

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
`

export const DeleteButton = styled.button`
  background: transparent;
  border: 0;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['red-500']};

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
`
