export var codeTags = [
   {
      tag: 'var ',
      path: 'Statements/var',
      weight: 1,
   },
   {
      tag: 'if',
      path: 'Statements/if...else',
      weight: 2,
   },
   {
      tag: 'else',
      path: 'Statements/if...else',
      weight: 2,
   },
   { tag: 'const ', path: 'Statements/const', weight: 1 },
   { tag: 'let ', path: 'Statements/let', weight: 1 },
   { tag: 'for', path: 'Statements/for', weight: 3 },
   { tag: 'while', path: 'Statements/while', weight: 3 },
   { tag: 'function', path: 'Statements/function', weight: 4 },
   { tag: 'return', path: 'Statements/return', weight: 2 },
   { tag: '{', path: 'Statements/block', weight: 1 },
   { tag: '(', path: 'Operators/Grouping', weight: 1 },
   {
      tag: '[',
      path: 'Global_Objects/Array#access_an_array_item_by_its_index',
      weight: 3,
   },
   { tag: '%', path: 'Operators/remainder', weight: 2 },
   { tag: ' + ', path: 'Operators/Addition', weight: 1 },
   { tag: ' + "', path: 'Operators/Addition#string_concatenation', weight: 1 },
   { tag: " + '", path: 'Operators/Addition#string_concatenation', weight: 1 },
   { tag: '`', path: 'Template_literals', weight: 2 },
   { tag: ' - ', path: 'Operators/Subtraction', weight: 1 },
   { tag: ' * ', path: 'Operators/Multiplication', weight: 2 },
   { tag: ' / ', path: 'Operators/Division', weight: 2 },
   { tag: '++', path: 'Operators/Increment', weight: 1 },
   { tag: '--', path: 'Operators/Decrement', weight: 1 },
   { tag: '+=', path: 'Operators/Addition_assignment', weight: 2 },
   { tag: '-=', path: 'Operators/Subtraction_assignment', weight: 2 },
   { tag: '*=', path: 'Operators/Multiplication_assignment', weight: 2 },
   { tag: '/=', path: 'Operators/Division_assignment', weight: 3 },
   { tag: '%=', path: 'Operators/Remainder_assignment', weight: 3 },
   { tag: ' = ', path: 'Operators/Assignment', weight: 1 },
   { tag: ' == ', path: 'Operators/Equality', weight: 1 },
   { tag: ' === ', path: 'Operators/Strict_equality', weight: 1 },
   { tag: ' != ', path: 'Operators/Inequality', weight: 1 },
   { tag: ' !== ', path: 'Operators/Strict_Inequality', weight: 1 },
   { tag: ' > ', path: 'Operators/Greater_than', weight: 1 },
   { tag: ' < ', path: 'Operators/Less_than', weight: 1 },
   { tag: ' >= ', path: 'Operators/Greater_than_or_equal', weight: 1 },
   { tag: ' <= ', path: 'Operators/Less_than_or_equal', weight: 1 },
   { tag: '!', path: 'Operators/Logical_NOT', weight: 1 },
   { tag: '&&', path: 'Operators/Logical_AND', weight: 2 },
   { tag: '||', path: 'Operators/Logical_OR', weight: 2 },
   { tag: '//', path: 'Lexical_grammar#comments', weight: 1 },
   { tag: '.split(', path: 'Global_Objects/String/split', weight: 5 },
   { tag: '.join(', path: 'Global_Objects/Array/join', weight: 5 },
   { tag: '.length', path: 'Global_Objects/Array/length', weight: 3 },
   { tag: '.push(', path: 'Global_Objects/Array/push', weight: 5 },
   { tag: '.pop(', path: 'Global_Objects/Array/pop', weight: 5 },
   { tag: '.concat(', path: 'Global_Objects/Array/concat', weight: 5 },
   { tag: '.indexOf(', path: 'Global_Objects/Array/indexOf', weight: 5 },
   { tag: 'Math.max(', path: 'Global_Objects/Math/max', weight: 3 },
   { tag: 'Math.min(', path: 'Global_Objects/Math/min', weight: 3 },
   { tag: '...', path: 'Operators/Spread_syntax', weight: 5 },
];
