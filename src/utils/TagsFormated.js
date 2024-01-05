const groupNames = (tags) => {
    const map = tags.reduce((acc, val) => {
        let char = val.title.charAt(0).toUpperCase();
        acc[char] = [].concat((acc[char] || []), val);
        return acc;
    }, {});
    const res = Object.keys(map).map(el => ({
        header: el,
        tagsList: map[el]
    }));
    return res;
};

export default groupNames