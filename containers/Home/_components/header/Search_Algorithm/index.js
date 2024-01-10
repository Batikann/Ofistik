import levenshteinDistance from "@/containers/Home/_components/header/Search_Algorithm/levenshtein";

const Search_Algorithm = (data, query, min_distance, keys, user_dt) => {
    const new_dt = [];

    for (let i = 0; i < data.length; i++) {
        const dt = data[i];
        const distances = [];

        for (let j = 0; j < keys.length; j++) {
            const subKeys = dt[keys[j]].toLowerCase().split(" ");
            const subDistances = subKeys.map(subKey =>
                levenshteinDistance(subKey, query.toLowerCase())
            );
            distances.push(...subDistances);
        }

        let max_distance = Math.max(...distances);

        const matchingUserDt = user_dt?.filter(({ clicked }) =>
            clicked.every((key, idx) => key === dt[keys[idx]])
        );

        matchingUserDt.forEach(() => {
            max_distance += 0.1;
        });

        if (max_distance >= min_distance) {
            new_dt.push({
                ...dt,
                score: max_distance,
            });
        }
    }

    new_dt.sort((a, b) => b.score - a.score);

    return new_dt;
};

export default Search_Algorithm;
