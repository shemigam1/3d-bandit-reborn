# URL Shortener

A fast and efficient URL shortening service that converts long URLs into short, manageable links. This service provides API endpoints for creating, managing, and analyzing shortened URLs.

## Features

- ✨ **URL Shortening**: Convert long URLs into short, shareable links
- 🔗 **Custom Aliases**: Create custom short codes for your URLs
- 📊 **Analytics**: Track click counts, referrers, and usage statistics
- 🚀 **Fast Redirects**: Lightning-fast redirection to original URLs
- 🛡️ **URL Validation**: Validates URLs before shortening
- 💾 **Database Storage**: Persistent storage with database support

## Demo

🌐 **Live Demo**: [Coming Soon]

## Tech Stack

- **Backend**: [Node.js/Express, Typescript]
- **Database**: [MongoDB]

## Installation

### Prerequisites

- [Runtime Environment - Node.js 18+]
- [Database - MongoDB]
- [Package Manager - e.g., npm]

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/shemigam1/url_shortener.git
   cd url_shortener
   ```

2. **Install dependencies**

   ```bash
   # For Node.js projects
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # setup environment variables
   touch .env

   # Edit the .env file with your configuration
   vim .env
   ```

4. **Environment Variables**

   ```env
   # Database Configuration
   DATABASE_URL=your_database_connection_string

   # Application Settings
   PORT=3000
   BASE_URL=http://localhost:3000

   ```

5. **Start the application**

   ```bash
   # Development mode
   npm run dev

   ```

## API Documentation

### Base URL

```
http://localhost:3000/api/v1/url
```

### Endpoints

#### 1. Shorten URL

```http
POST /
Content-Type: application/json

{
  "url": "https://www.example.com/very/long/url/that/needs/shortening",
}
```

**Response:**

```json
{
  "success": true,
  "message": "short url created",
  "code": 200,
  "ReturnStatus": "OK"
  "data": {
    "id": "abc123",
    "shortUrl": "http://localhost:3000/abc123",
    "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
    "customAlias": "optional-custom-alias",
    "createdAt": "2024-01-15T10:30:00Z",
    "expiresAt": "2024-12-31T23:59:59Z",
    "clickCount": 0
  }
}
```

#### 2. Get Short URL

```http
GET /:shortUrl
```

**Response:**

```json
{
  "success": true,
  "message": "short url created",
  "code": 200,
  "ReturnStatus": "OK"
  "data": {
    "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. 🐛 **Bug Reports**: [Create an issue](https://github.com/shemigam1/url_shortener/issues)
2. 💬 **Discussions**: [GitHub Discussions](https://github.com/shemigam1/url_shortener/discussions)
3. 📧 **Email**: semiloreomotade@gmail.com

## Roadmap

- [ ] User authentication and URL management
- [ ] Advanced analytics dashboard
- [ ] QR code generation for short URLs
- [ ] Bulk URL shortening
- [ ] API key management
- [ ] Webhook notifications
- [ ] Custom domains support
- [ ] URL preview before redirect

⭐ **Star this repository** if you find it helpful!

Made with ❤️ by [shemigam1](https://github.com/shemigam1)
