import styled from '@emotion/styled';

interface Props {
  onChangeTime: (value: number) => void;
}

// TODO : 커스텀 형태로 변경 필요
const Dropdown = ({ onChangeTime }: Props) => {
  const handleTimeValueClick = (e: any) => {
    onChangeTime(e.target.value);
  };

  return (
    <DropdownStyled name="time" onChange={(e) => handleTimeValueClick(e)}>
      <DropdownItem value={10}>10</DropdownItem>
      <DropdownItem value={20}>20</DropdownItem>
      <DropdownItem value={30}>30</DropdownItem>
      <DropdownItem value={40}>40</DropdownItem>
      <DropdownItem value={50}>50</DropdownItem>
      <DropdownItem value={60}>60</DropdownItem>
      <DropdownItem value={70}>70</DropdownItem>
      <DropdownItem value={80}>80</DropdownItem>
      <DropdownItem value={90}>90</DropdownItem>
      <DropdownItem value={100}>100</DropdownItem>
      <DropdownItem value={110}>110</DropdownItem>
      <DropdownItem value={120}>120</DropdownItem>
    </DropdownStyled>
  );
};

const DropdownStyled = styled.select``;

const DropdownItem = styled.option``;

export default Dropdown;
