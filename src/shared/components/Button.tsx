import MaterialUIButton from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

type ButtonType = 'primary' | 'secondary';

interface Props {
  onClick: () => void;
  label: string;
  type?: ButtonType;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  })
);

const Button: FC<Props> = ({ onClick, label, type, disabled }) => {
  const classes = useStyles();
  return (
    <MaterialUIButton
      variant="contained"
      className={classes.button}
      color={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </MaterialUIButton>
  );
};

export default Button;
