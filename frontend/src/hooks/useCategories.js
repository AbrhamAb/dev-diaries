import { useState, useEffect } from "react";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/categories/") // <-- use full backend URL
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);
    return categories;
}