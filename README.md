# search-the-professionals

## Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)


## Backend and Frontend Setup 

1. Clone the repository:
   git clone https://github.com/PrathaMaharjan/search-the-professionals.git

2. Navigate to frontend
   cd search-the-professionals/backend


3. Install dependencies
   npm install

4. Create .env file
   PORT=3000

   JWT_SECRET="search_the_professionals" 

   MONGO_URI = "mongodb+srv://pratha:prathamaharjan@professionals.nghhxh3.mongodb.net/?retryWrites=true&w=majority&appName=professionals"

   CLOUDINARY_CLOUD_NAME="dv3ywadez"

   CLOUDINARY_API_KEY="564639276951231"

   COUDINARY_API_SECRET="yTdYSkB8mKOixaUczrr_Ofpj4XU"


5. Start the backend
   npm run dev


6. The backend API will be available at http://localhost:3000/api


7. Navigate to backend
   cd search-the-professionals/front/frontend

8. Install dependencies
   npm install
   
## Notes
- Ensure MongoDB is running before starting the backend.
- Cloudinary credentials are required for uploading profile pictures.
- Default port settings are 3000 for backend, 5173 for frontend (if using Vite).

   
      
