const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); 

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await api.get(`/products/${id}`); 
                setProduct(response.data); 
            } catch (error) {
                console.error('Erro ao carregar detalhes do produto:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const { name, description, price, quantity, category } = product;

    return (
        <div className="detail" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div className="divDetail">
                <div className="div1">
                    <h1>{name}</h1>
                </div>
                <div>
                    <h3>Descrição: {description}</h3>
                    <h3>Preço: {price}</h3>
                    <h3>Quantidade: {quantity}</h3>
                    <h3>Categoria: {category}</h3>
                </div>
            </div>
        </div>
    );
};
