/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    var number = []
    preorder(root, number)
    return number
};
var preorder = function(root, number) {
    if (root == null) {
        return
    }
    number.push(root.val)
    preorder(root.left, number)
    preorder(root.right, number)
}

/**
 * 非递归，使用栈
 * 右子树先入栈，左子树再入栈
 * 循环出栈
 * @param {*} root 
 */

var preorderTraversal = function(root) {
    var number = []
    var stack = []
    if (root == null) {
        return number
    } 
    stack.push(root)
    while(stack.length > 0) {
        var item = stack.pop()
        number.push(item.val)
        if (item.right != null) {
            stack.push(item.right)
        }
        if (item.left != null) {
            stack.push(item.left)
        }
    }
    return number
};

