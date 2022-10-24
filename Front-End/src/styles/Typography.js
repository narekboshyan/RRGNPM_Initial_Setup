import { makeStyles } from '@material-ui/core/styles';

export const useTypographyStyles = makeStyles({
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});
