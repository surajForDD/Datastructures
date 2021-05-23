const Node = require('./Node')
const drawHelper = require('./drawing.helper')
const { createCanvas } = require('canvas')

module.exports = class AVLTree {

    constructor() {
        this.root = null
    }
    insert(value) {

        let tempNode = new Node(value)
        let leafNode = this._insert_node_into_bst(tempNode)
        // console.log('inserted ', leafNode.data)
        let tempParent = leafNode.parent
        // console.log(this.root)
        while (tempParent != null) {
            // console.log("calculating for ", tempParent.data)
            let balance = this._calculate_balance(tempParent)
            tempParent.balance = balance
            // console.log(tempParent)
            // console.log(balance)
            if (Math.abs(balance) > 1) {
                // console.log("temp parent ", tempParent.data)
                try {
                    this._balance_using_rotate(tempParent)
                    //   tempParent = leafNode.parent
                continue
                }
                catch(e){
                    console.log(`error while insering ${value}`)
                    this._assign_level()
                    const canvas = createCanvas(5000, 2000)
                    drawHelper.traversal(this.root, {x:2500,y:50},canvas)
                    drawHelper.writeToFile(canvas)
                    throw e 

                }
                
            }
            tempParent = tempParent.parent
        }

    }
    delete(value) {

    }
    search(value) {

    }
    printTree() {
        this._assign_level()
        let nodes = []
        nodes.push(this.root)
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i]
            if (node.left != null) {
                nodes.push(node.left)

            }
            if (node.right != null) {
                nodes.push(node.right)

            }
        }
        console.log(nodes.length)
        let maxLevel = this._get_max_level(nodes)
        console.log(maxLevel)
        for (let i = 1; i <= maxLevel; i++) {
            
            console.log(nodes.filter(node => node.level == i).map(node=>node.data))

        }

    }
    printRoot() {
        console.log("Root is ", this.root.data)
        console.log(this.root)
    }
    _calculate_height(node) {
        if (node == null) {
            return 0

        }
        return Math.max(1 + this._calculate_height(node.left), 1 + this._calculate_height(node.right))

    }

    _calculate_balance(node) {
        // console.log("inside calcualte", node.left)
        let left = this._calculate_height(node.left)
        let right = this._calculate_height(node.right)
        return left - right

    }
    _calculate_level() {

    }
    _get_max_level(nodes) {
        let values = nodes.map(node => node.level)
        console.log(values)
        return Math.max.apply(null, values);
    }
    _insert_node_into_bst(node) {

        if (this.root == null) {
            this.root = node
            return this.root
        }
        let currentNode = this.root
        let parentNode = this.root.parent
        while (true) {
            if (node.data > currentNode.data) {
                parentNode = currentNode
                currentNode = currentNode.right
                if (currentNode == null) {
                    parentNode.right = node
                    node.parent = parentNode
                    break
                }


            } else {
                parentNode = currentNode
                currentNode = currentNode.left

                if (currentNode == null) {
                    parentNode.left = node
                    node.parent = parentNode
                    break
                }

            }
        }
        return node


    }
    _balance_using_rotate(node) {
        let grandFather = node
        // console.log("grand parent balance",node.balance)
        // console.log("gra")
        let parent = node.balance > 0 ? node.left : node.right
        // console.log("parent balance",parent.balance)
        let child = parent.balance > 0 ? parent.left : parent.right
        if (grandFather.balance < 0 && parent.balance < 0) {
            this._rotate_left(grandFather, parent, child)
        } else if (grandFather.balance > 0 && parent.balance > 0) {
            this._rotate_right(grandFather, parent, child)

        } else if (grandFather.balance < 0 && parent.balance > 0) {
            this._rotate_right_left(grandFather, parent, child)
        } else {
            this._rotate_left_right(grandFather, parent, child)
        }


    }
    _rotate_left(grandFather, parent, child) {
        // console.log("Rotating left")
        let grandFatherParent = grandFather.parent
        let tempLeftChildOfParent = parent.left
        if (grandFatherParent == null) {
            parent.left = grandFather
            grandFather.right = tempLeftChildOfParent
            if (tempLeftChildOfParent != null) {
                tempLeftChildOfParent.parent = grandFather

            }
            grandFather.parent = parent 
            parent.parent = null
            this.root = parent
            return

        }
        if (grandFatherParent && grandFatherParent.left && grandFatherParent.left.data == grandFather.data) {
            parent.left = grandFather
            grandFather.right = tempLeftChildOfParent
            if (tempLeftChildOfParent != null) {
                tempLeftChildOfParent.parent = grandFather
            }
            grandFather.parent = parent
            parent.parent = grandFatherParent
            grandFatherParent.left = parent
            return
        } else {
            parent.left = grandFather
            grandFather.right = tempLeftChildOfParent

            if (tempLeftChildOfParent != null) {
                tempLeftChildOfParent.parent = grandFather
            }
            grandFather.parent = parent 
            parent.parent = grandFatherParent
            grandFatherParent.right = parent
            return

        }

    }
    _rotate_right(grandFather, parent, child) {
        // console.log("Rotating right")
        let grandFatherParent = grandFather.parent
        let tempRightChildOfParent = parent.right
        if (grandFatherParent == null) {
            parent.right = grandFather
            grandFather.left = tempRightChildOfParent
            if (tempRightChildOfParent != null) {
                tempRightChildOfParent.parent = grandFather

            }
            grandFather.parent = parent 
            parent.parent = null
            this.root = parent
            return

        }
        if (grandFatherParent && grandFatherParent.left && grandFatherParent.left.data == grandFather.data) {
            parent.right = grandFather
            grandFather.left = tempRightChildOfParent
            if (tempRightChildOfParent != null) {
                tempRightChildOfParent.parent = grandFather
            }
            grandFather.parent = parent 
            parent.parent = grandFatherParent
            grandFatherParent.left = parent
            return
        } else {
            parent.right = grandFather
            grandFather.left = tempRightChildOfParent

            if (tempRightChildOfParent != null) {
                tempRightChildOfParent.parent = grandFather
            }
            grandFather.parent = parent 
            parent.parent = grandFatherParent
            grandFatherParent.right = parent
            return

        }

    }
    _rotate_right_left(grandFather, parent, child) {
        // console.log("Implementing right left ")
        let tempLeftOfChild = child.left
        let tempRightOfChild = child.right
        let grandFatherParent = grandFather.parent
        if (grandFatherParent == null) {
            child.parent = null
            this.root = child
        } else {
            child.parent = grandFatherParent
            if (grandFatherParent && grandFatherParent.left && grandFatherParent.left.data == grandFather.data) {
                grandFatherParent.left = child
            } else {
                grandFatherParent.right = child
            }

        }
        child.left = grandFather
        grandFather.parent = child
        child.right = parent
        parent.parent = child
        grandFather.right = tempLeftOfChild
        parent.left = tempRightOfChild
        if (tempLeftOfChild != null) {
            tempLeftOfChild.parent = grandFather
        }
        if (tempRightOfChild != null) {
            tempRightOfChild.parent = parent

        }
        return


    }
    _rotate_left_right(grandFather, parent, child) {
        // console.log("implementing left right")
        let tempLeftOfChild = child.left
        let tempRightOfChild = child.right
        let grandFatherParent = grandFather.parent
        if (grandFatherParent == null) {
            child.parent = null
            this.root = child
        } else {
            child.parent = grandFatherParent
            if (grandFatherParent && grandFatherParent.left && grandFatherParent.left.data == grandFather.data) {
                grandFatherParent.left = child
            } else {
                grandFatherParent.right = child
            }

        }
        child.right = grandFather
        grandFather.parent = child
        child.left = parent
        parent.parent = child
        grandFather.left = tempRightOfChild
        parent.right = tempLeftOfChild
        if (tempLeftOfChild != null) {
            tempLeftOfChild.parent = parent
        }
        if (tempRightOfChild != null) {
            tempRightOfChild.parent = grandFather

        }
        return

    }
    _assign_level() {
        this._assign_level_to_node(this.root, 1)

    }
    _assign_level_to_node(node, level) {
        if (node == null) {
            return
        }
        node.level = level
        this._assign_level_to_node(node.left, level + 1)
        this._assign_level_to_node(node.right, level + 1)

    }


}