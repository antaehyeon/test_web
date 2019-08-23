import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import PropTypes from "prop-types";

const ITEM_NAME = 0;
const ITEM_PRICE = 1;
const MINUS = -1;
const PLUS = 1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Item = props => {
  const {
    idx,
    item: { itemName, itemPrice },
    itemList,
    setItemList,
    totalPrice,
    setTotalPrice
  } = props;

  const [itemCount, setItemCount] = useState(0);

  const adjustTotalPrice = (type, price) => {
    let _totalPrice = totalPrice;
    const _price = price;

    if (type === MINUS) _totalPrice -= _price;
    else _totalPrice += _price;

    setTotalPrice(_totalPrice);
  };

  const removeItem = () => {
    const _itemList = _.cloneDeep(itemList);
    _itemList.splice(idx, 1);
    setItemList(_itemList);
  };

  const processDeleteItem = () => {
    const itemTotalPrice = itemPrice * itemCount;
    removeItem();
    adjustTotalPrice(MINUS, itemTotalPrice);
  };

  const processPlusItemCnt = () => {
    setItemCount(itemCount + 1);
    adjustTotalPrice(PLUS, itemPrice);
  };

  const processMinusItemCnt = () => {
    if (itemCount === 0) return;
    setItemCount(itemCount - 1);
    adjustTotalPrice(MINUS, itemPrice);
  };

  return (
    <ItemContainer>
      <p>{`${itemName} (${itemPrice}): ${itemCount}`}</p>
      <button type="button" onClick={processPlusItemCnt}>
        +1
      </button>
      <button type="button" onClick={processMinusItemCnt}>
        -1
      </button>
      <button type="button" onClick={processDeleteItem}>
        삭제
      </button>
    </ItemContainer>
  );
};

const addItem = (param, itemList, setFunction) => {
  const _itemList = _.cloneDeep(itemList);
  const splitedDatas = param.split("/");
  const itemName = splitedDatas[ITEM_NAME];
  const itemPrice = parseInt(splitedDatas[ITEM_PRICE]);

  _itemList.push({ itemName, itemPrice });
  setFunction(_itemList);
};

const inputHandler = (e, setFunction) => {
  const inputedText = e.target.value;
  setFunction(inputedText);
};

const App = () => {
  const [itemList, setItemList] = useState([]);
  const [currentInputedText, setCurrentInputedText] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const processAddButton = () => {
    setCurrentInputedText("");
    addItem(currentInputedText, itemList, setItemList);
  };

  return (
    <Container>
      <InputContainer>
        <input placeholder="name/price" value={currentInputedText} onChange={e => inputHandler(e, setCurrentInputedText)} />
        <button type="button" onClick={processAddButton}>
          Add
        </button>
      </InputContainer>
      {itemList.map((item, idx) => {
        return (
          <Item key={idx} idx={idx} item={item} itemList={itemList} setItemList={setItemList} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
        );
      })}
      <p>{`Total : ${totalPrice}`}</p>
    </Container>
  );
};

Item.propTypes = {
  idx: PropTypes.number,
  item: PropTypes.shape({
    itemName: PropTypes.string,
    itemPrice: PropTypes.number
  }),
  itemList: PropTypes.array,
  setItemList: PropTypes.func,
  totalPrice: PropTypes.number,
  setTotalPrice: PropTypes.func
};

export default App;
