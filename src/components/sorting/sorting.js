import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setSortValue } from "../actions/sortAction";

import "./sorting.scss";

const StyledSelect = styled(Select)(() => ({
    '&.MuiOutlinedInput-root': {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0050e0',
        },
    },
}));

const Sorting = () => {
    const sortValue = useSelector(store => store.sortData.value);
    const dispatch = useDispatch();

    return (
        <StyledSelect className="sorting"
            value={sortValue}
            onChange={(e) => dispatch(setSortValue(e.target.value))}
            displayEmpty
            sx={{ height: "45px" }}
            >
            <MenuItem value="popular">По популярности</MenuItem>
            <MenuItem value="cheaper">Сначала дешевле</MenuItem>
            <MenuItem value="expensive">Сначала дороже</MenuItem>
        </StyledSelect>
    )
};

export default Sorting;