import React from 'react';
import Button from '@atlaskit/button';
import styled, { css } from 'styled-components';
import CheckIcon from '@atlaskit/icon/glyph/check';
import TrashIcon from '@atlaskit/icon/glyph/trash';

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }

  ${(p) =>
    !p.isCompleted &&
    css`
      text-decoration: none;
    `}

  &:hover {
    .check-icon {
      display: inline-block;
    }
  }

  .check-icon {
    display: none;

    &:hover {
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick, onDeleteBtnClick }) {
  return (
    <ButtonStyled
      isCompleted={todo.isCompleted}
      shouldFitContainer
      iconAfter={
        !todo.isCompleted ? (
          <span className="check-icon" onClick={() => onCheckBtnClick(todo.id)}>
            <CheckIcon primaryColor="#0A7B2D" />
          </span>
        ) : (
          <span
            className="trash-icon"
            onClick={() => onDeleteBtnClick(todo.id)}
          >
            <TrashIcon primaryColor="#C8102E" />
          </span>
        )
      }
    >
      {todo.name}
    </ButtonStyled>
  );
}
