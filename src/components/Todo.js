import Button from '@atlaskit/button';
import React from 'react';
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

  &:hover {
    .delete-icon {
      display: inline-block;
    }
  }

  .delete-icon {
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
            <CheckIcon primaryColor="#0AC200" />
          </span>
        ) : (
          <span
            className="delete-icon"
            onClick={() => onDeleteBtnClick(todo.id)}
          >
            <TrashIcon primaryColor="#C20600" />
          </span>
        )
      }
    >
      {todo.name}
    </ButtonStyled>
  );
}
