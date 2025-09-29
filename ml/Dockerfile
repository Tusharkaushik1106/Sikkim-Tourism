# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (change if your app uses a different port)
EXPOSE 5000

# Set environment variables (optional, can be overridden in deployment)
# ENV FLASK_ENV=production

# Start the app (update if using FastAPI or other framework)
CMD ["python", "app.py"]
