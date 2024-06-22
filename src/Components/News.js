const API_KEY = 'cf6fafe9bbe629ba3ce94aab4022efd0';

const fetchArticles = async (category, page) => {
    const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=in&lang=en&topic=${category}&page=${page}&pageSize=20`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch articles failed:', error.message);
        throw error;
    }
};
export default fetchArticles;