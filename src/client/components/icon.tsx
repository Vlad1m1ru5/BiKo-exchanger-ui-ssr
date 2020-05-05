import styled from 'styled-components'

const Icon = styled.img<{ theme: Theme }>`
  height: ${({ theme }) => theme.atom.size};
  width: ${({ theme }) => theme.atom.size};
`

export default Icon