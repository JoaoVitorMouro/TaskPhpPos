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

  tr {
    cursor: pointer;
    background: ${(props) => props.theme['gray-700']};

    transition: background 0.2s;

    &:hover {
      background-color: ${(props) => props.theme['gray-600']};
    }
  }

  td {
    padding: 1.25rem 2rem;

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
