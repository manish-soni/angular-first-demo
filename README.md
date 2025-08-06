# Angular Microfrontend Registry System

A complete microfrontend architecture using Angular Shell Application with three independent microapps, managed through a JSON registry system.

## 🏗️ Architecture Overview

This project demonstrates a registry-driven microfrontend system where:

- **Shell Application** (port 4200): Central hub that dynamically loads microapps
- **Microapp 1** (port 4201): Dashboard microapp with user management features
- **Microapp 2** (port 4202): Sales Portal with revenue tracking
- **Microapp 3** (port 4203): Analytics Hub with advanced reporting

Each microapp is built as an Angular Element (Web Component) and loaded dynamically by the shell application based on the JSON registry configuration.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Angular CLI 17+

### Installation

1. **Install dependencies for all applications:**

   ```bash
   npm run install:all
   ```

2. **Start development servers for all applications:**

   ```bash
   npm run serve:dev
   ```

   This will start:

   - Shell App: http://localhost:4200
   - Microapp 1: http://localhost:4201
   - Microapp 2: http://localhost:4202
   - Microapp 3: http://localhost:4203

3. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

## 📁 Project Structure

```
microfrontend-registry/
├── shell-app/                 # Shell application
│   ├── src/
│   │   ├── assets/
│   │   │   └── registry.json  # Microapp registry configuration
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── registry.service.ts
│   │   │   │   └── microapp-loader.service.ts
│   │   │   └── components/
│   │   │       ├── home/
│   │   │       └── microapp-host/
│   │   └── ...
├── microapp1/                 # Dashboard microapp
├── microapp2/                 # Sales Portal microapp
├── microapp3/                 # Analytics Hub microapp
└── package.json               # Root workspace configuration
```

## 🎯 Key Features

### 1. **Registry-Driven Configuration**

Microapps are configured via JSON registry (`shell-app/src/assets/registry.json`):

```json
{
  "microapps": [
    {
      "name": "Dashboard",
      "route": "app1",
      "bundleUrl": "http://localhost:4201/main.js",
      "tagName": "microapp-one",
      "description": "User management and analytics dashboard"
    }
  ]
}
```

### 2. **Dynamic Loading**

- Microapps are loaded on-demand when routes are accessed
- Bundle scripts are injected dynamically into the DOM
- Custom elements are mounted/unmounted as needed

### 3. **Angular Elements (Web Components)**

Each microapp exports itself as a custom element:

- `<microapp-one>` - Dashboard
- `<microapp-two>` - Sales Portal
- `<microapp-three>` - Analytics Hub

### 4. **Independent Development**

- Each microapp can be developed, built, and deployed independently
- No shared dependencies between microapps
- Shell app coordinates integration

## 🛠️ Development Commands

### Workspace Commands

```bash
# Install all dependencies
npm run install:all

# Build all applications
npm run build:all

# Serve all applications in development mode
npm run serve:dev
```

### Individual Application Commands

```bash
# Shell application
npm run serve:shell
npm run build:shell

# Individual microapps
npm run serve:microapp1
npm run build:microapp1
# ... similar for microapp2, microapp3
```

## 🔧 Configuration

### Adding a New Microapp

1. **Create the Angular application:**

   ```bash
   ng new microapp4 --routing=false --style=scss
   cd microapp4
   npm install @angular/elements@^17.0.0
   ```

2. **Configure as Angular Element** in `main.ts`:

   ```typescript
   import { createCustomElement } from "@angular/elements";
   import { createApplication } from "@angular/platform-browser";
   import { AppComponent } from "./app/app.component";

   (async () => {
     const app = await createApplication({ providers: [] });
     const element = createCustomElement(AppComponent, {
       injector: app.injector,
     });
     customElements.define("microapp-four", element);
   })();
   ```

3. **Add to registry** (`shell-app/src/assets/registry.json`):

   ```json
   {
     "name": "New Microapp",
     "route": "app4",
     "bundleUrl": "http://localhost:4204/main.js",
     "tagName": "microapp-four",
     "description": "Description of new microapp"
   }
   ```

4. **Add route** to shell app (`shell-app/src/app/app.routes.ts`):
   ```typescript
   {
     path: 'app4',
     component: MicroappHostComponent
   }
   ```

### Customizing Bundle URLs

For production deployment, update the `bundleUrl` in `registry.json` to point to your CDN or server:

```json
{
  "bundleUrl": "https://cdn.example.com/microapp1/main.js"
}
```

## 🏭 Production Build

### Build All Applications

```bash
npm run build:all
```

### Deploy Microapps

Each microapp should be deployed to its own domain/CDN and the `main.js` file made available at the configured `bundleUrl`.

### Deploy Shell Application

Deploy the shell application with updated `registry.json` pointing to production bundle URLs.

## 🧪 Development & Testing

### Running Individual Microapps

Each microapp can be developed independently:

```bash
cd microapp1
npm run serve
# Navigate to http://localhost:4201
```

### Testing the Integration

1. Start all applications: `npm run serve:dev`
2. Navigate to shell app: `http://localhost:4200`
3. Click on microapp cards or use navigation links
4. Verify microapps load dynamically

## 📊 System Benefits

- **Scalability**: Add new microapps without touching existing code
- **Team Independence**: Teams can work on microapps independently
- **Technology Flexibility**: Each microapp can use different Angular versions/libraries
- **Deployment Flexibility**: Deploy microapps independently
- **Runtime Composition**: Microapps are composed at runtime, not build time

## 🚨 Troubleshooting

### Common Issues

1. **Custom Element Not Defined Error**

   - Ensure the microapp bundle loaded successfully
   - Check console for script loading errors
   - Verify the custom element is properly exported

2. **CORS Issues**

   - Ensure all microapps are served from allowed origins
   - Configure CORS headers if needed

3. **Port Conflicts**

   - Ensure each application uses a unique port
   - Check `angular.json` serve configurations

4. **Bundle Loading Failures**
   - Verify bundle URLs in `registry.json` are correct
   - Check network tab for failed requests
   - Ensure microapp development servers are running

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the integration
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
