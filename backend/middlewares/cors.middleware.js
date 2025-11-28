import Cors from 'cors';

const cors = Cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST']
});

export default cors;