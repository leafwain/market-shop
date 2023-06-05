import { useDispatch, useSelector } from "react-redux";
import { setSortValue } from "../actions/sortAction";

import "./sorting.css";

const Sorting = () => {
    const sortValue = useSelector(store => store.sortData.value);
    const dispatch = useDispatch();

    return (
        <div className="sorting">
            <select defaultValue={sortValue} onChange={(e) => dispatch(setSortValue(e.target.value))}>
                <option value="popular">По популярности</option>
                <option value="cheaper">Сначала дешевле</option>
                <option value="expensive">Сначала дороже</option>
            </select>
        </div>
    )
};

export default Sorting;