import ts, { ImportDeclaration, SyntaxKind } from 'typescript';

function createObjectLiteralExpression(): ts.ObjectLiteralExpression {
  const test = ts.factory.createStringLiteral('test');
  const hello = ts.factory.createStringLiteral('Hello world!');
  const propAsgmt = ts.factory.createPropertyAssignment(test, hello);
  const objExpr = ts.factory.createObjectLiteralExpression([propAsgmt], true);
  return objExpr;
}

function transform(program: ts.Program, pluginOptions: {}) {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor(node: ts.Node): ts.Node {

        if (node.kind === SyntaxKind.ImportDeclaration) {
          const importDecl = node as ImportDeclaration;
          if (importDecl.getFullText().includes('some.json')) {
            const objectLiteralExpression = createObjectLiteralExpression();

            const constIdentifier = ts.factory.createIdentifier('const');
            const constTypeRef = ts.factory.createTypeReferenceNode(constIdentifier);
            const asExpression = ts.factory.createAsExpression(objectLiteralExpression, constTypeRef);
            const identifier = ts.factory.createIdentifier('c');
            const variableDeclaration = ts.factory.createVariableDeclaration(identifier, undefined, undefined, asExpression);
            const variableStatement = ts.factory.createVariableStatement([], [variableDeclaration]);
            return variableStatement;
          }
        }
        
        return ts.visitEachChild(node, visitor, ctx);
      }

      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
}

export default transform;
