import styled from 'styled-components'

export const ContainerMainCells = styled.div`
  .buttons {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;

    * {
      box-sizing: border-box;
      margin: 10px;
    }
  }

  .layout * {
    overflow: hidden;
  }
`
