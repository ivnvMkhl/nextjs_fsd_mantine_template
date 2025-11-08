/**
 * Custom ESLint rule to enforce FSD (Feature-Sliced Design) import restrictions
 * 
 * Rules:
 * - app: can import any layer and node_modules
 * - widget: can import only self, feature, shared and node_modules
 * - feature: can import only self, shared and node_modules
 * - shared: can import only node_modules
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce FSD architecture import restrictions',
    },
    messages: {
      invalidImport: 'Layer "{{layer}}" cannot import from "{{importedLayer}}". Allowed imports: {{allowed}}',
    },
    schema: [],
  },

  create(context) {
    const layerRules = {
      app: ['app', 'widget', 'feature', 'shared'],
      widget: ['widget', 'feature', 'shared'],
      feature: ['feature', 'shared'],
      shared: [],
    };

    function normalizePath(path) {
      // Normalize path separators for cross-platform compatibility
      return path.replace(/\\/g, '/');
    }

    function getLayerFromPath(filePath) {
      const normalizedPath = normalizePath(filePath);
      // Check for /src/app/, /src/widgets/, /src/features/, /src/shared/
      if (normalizedPath.includes('/src/app/')) return 'app';
      if (normalizedPath.includes('/src/widgets/')) return 'widget';
      if (normalizedPath.includes('/src/features/')) return 'feature';
      if (normalizedPath.includes('/src/shared/')) return 'shared';
      return null;
    }

    function getLayerFromImport(importPath) {
      // Check aliased imports first
      if (importPath.startsWith('@app/')) return 'app';
      if (importPath.startsWith('@widgets/')) return 'widget';
      if (importPath.startsWith('@features/')) return 'feature';
      if (importPath.startsWith('@shared/')) return 'shared';
      
      // Check relative imports by analyzing the file path
      if (importPath.startsWith('../') || importPath.startsWith('./')) {
        const filePath = normalizePath(context.getFilename());
        const pathParts = filePath.split('/');
        const srcIndex = pathParts.indexOf('src');
        
        if (srcIndex !== -1) {
          // Count how many levels up we're going
          const levelsUp = (importPath.match(/\.\.\//g) || []).length;
          
          // Calculate target path
          if (levelsUp > 0) {
            const currentLayerIndex = srcIndex + 1;
            const targetIndex = currentLayerIndex - levelsUp;
            
            if (targetIndex >= 0 && targetIndex < pathParts.length) {
              const targetDir = pathParts[targetIndex];
              // Check if target is one of our layers
              if (targetDir === 'app') return 'app';
              if (targetDir === 'widgets') return 'widget';
              if (targetDir === 'features') return 'feature';
              if (targetDir === 'shared') return 'shared';
            }
          } else {
            // Same-level import (./), stay in same layer
            const currentLayer = getLayerFromPath(filePath);
            return currentLayer;
          }
        }
      }
      
      // If we can't determine, return null (will be treated as node_modules)
      return null;
    }

    function isNodeModuleImport(importPath) {
      // If import doesn't start with @, ./, or ../, it's likely a node_modules import
      return !importPath.startsWith('@') && 
             !importPath.startsWith('./') && 
             !importPath.startsWith('../');
    }

    return {
      ImportDeclaration(node) {
        const filePath = context.getFilename();
        const currentLayer = getLayerFromPath(filePath);
        
        // Only check files within recognized layers
        if (!currentLayer) {
          return;
        }

        const importSource = node.source.value;
        
        // Skip node_modules imports (they're allowed for all layers)
        if (isNodeModuleImport(importSource)) {
          return;
        }

        const importedLayer = getLayerFromImport(importSource);
        
        // If we can't determine the layer, skip (might be relative import within same layer)
        if (importedLayer === null) {
          return;
        }

        const allowedLayers = layerRules[currentLayer];
        
        // Check if import violates FSD rules
        if (!allowedLayers.includes(importedLayer)) {
          const allowedStr = allowedLayers.length > 0 
            ? allowedLayers.join(', ') + ', node_modules'
            : 'node_modules only';
          
          context.report({
            node: node.source,
            messageId: 'invalidImport',
            data: {
              layer: currentLayer,
              importedLayer: importedLayer,
              allowed: allowedStr,
            },
          });
        }
      },
    };
  },
};

