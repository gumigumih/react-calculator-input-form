export function normalizeNumberString(num: number, maxFractionDigits: number = 6) {
  if (!isFinite(num)) return '0';
  const fixed = num.toFixed(maxFractionDigits);
  const trimmed = fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  return trimmed;
}

export function calculateExpression(expr: string): string {
  try {
    const sanitized = expr.replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/').trim();
    if (!sanitized) return '0';

    const tokens = sanitized.match(/(\d+(?:\.\d+)?|[+\-*/()])/g);
    if (!tokens) return '0';

    const output: (number | string)[] = [];
    const operators: string[] = [];
    const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (/^\d/.test(token)) {
        output.push(Number(token));
        continue;
      }

      if (token === '(') {
        operators.push(token);
        continue;
      }

      if (token === ')') {
        while (operators.length && operators[operators.length - 1] !== '(') {
          output.push(operators.pop() as string);
        }
        if (!operators.length) return '0';
        operators.pop();
        continue;
      }

      const prevToken = tokens[i - 1];
      const isUnaryMinus = token === '-' && (i === 0 || ['+', '-', '*', '/', '('].includes(prevToken));
      if (isUnaryMinus) {
        const nextToken = tokens[i + 1];
        if (!nextToken || !/^\d/.test(nextToken)) return '0';
        output.push(Number(`-${nextToken}`));
        i += 1;
        continue;
      }

      while (
        operators.length &&
        operators[operators.length - 1] !== '(' &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop() as string);
      }
      operators.push(token);
    }

    while (operators.length) {
      const operator = operators.pop() as string;
      if (operator === '(') return '0';
      output.push(operator);
    }

    const stack: number[] = [];
    for (const token of output) {
      if (typeof token === 'number') {
        stack.push(token);
        continue;
      }

      const right = stack.pop();
      const left = stack.pop();
      if (left === undefined || right === undefined) return '0';

      switch (token) {
        case '+':
          stack.push(left + right);
          break;
        case '-':
          stack.push(left - right);
          break;
        case '*':
          stack.push(left * right);
          break;
        case '/':
          stack.push(right === 0 ? Number.NaN : left / right);
          break;
        default:
          return '0';
      }
    }

    if (stack.length !== 1 || !isFinite(stack[0])) return '0';
    return normalizeNumberString(stack[0]);
  } catch {
    return '0';
  }
}

