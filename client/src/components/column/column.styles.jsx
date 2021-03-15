import styled from "styled-components";
import globalcss from '../../global-css/styled-component-variable'
export const Container = styled.div`
  margin: 8px;
  border: 1px solid ${globalcss.textcolor};
  border-radius: 2px;
  /* width: 300px; */
  /* display: flex;
  flex-direction: column;
  height: 100%; */
  //increases the width
  /* flex: 2; */
`;
export const Title = styled.div`
  padding: 8px;
`;
export const OrderList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? globalcss.primary : globalcss.secondary)};
  /* flex-grow: 1; */
  min-height: 60px;
`;
