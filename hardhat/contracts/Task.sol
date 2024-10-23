// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract TaskContract is ReentrancyGuard {
    using ECDSA for bytes32;

    uint256 private _taskIds;

    struct Task {
        uint256 id;
        address employer;
        address employee;
        uint256 bounty;
        bytes32 agreementHash;
        bool employerSigned;
        bool employeeSigned;
        bool completed;
        bool fundReleased;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(
        uint256 taskId,
        address employer,
        address employee,
        uint256 bounty,
        bytes32 agreementHash
    );
    event TaskSigned(uint256 taskId, address signer, string signerRole);
    event TaskStarted(uint256 taskId);
    event CompletionRequested(uint256 taskId);
    event TaskCompleted(uint256 taskId);
    event FundsReleased(uint256 taskId, address employee, uint256 amount);

    function createTask(
        address _employee,
        bytes32 _agreementHash
    ) external payable returns (uint256) {
        require(msg.value > 0, "Bounty must be greater than 0");

        _taskIds += 1;
        uint256 newTaskId = _taskIds;

        Task storage newTask = tasks[newTaskId];
        newTask.id = newTaskId;
        newTask.employer = msg.sender;
        newTask.employee = _employee;
        newTask.bounty = msg.value;
        newTask.agreementHash = _agreementHash;

        emit TaskCreated(
            newTaskId,
            msg.sender,
            _employee,
            msg.value,
            _agreementHash
        );
        return newTaskId;
    }

    function signTask(uint256 _taskId, bytes memory _signature) external {
        Task storage task = tasks[_taskId];
        require(
            msg.sender == task.employer || msg.sender == task.employee,
            "Only employer or employee can sign"
        );
        require(
            !(task.employerSigned && task.employeeSigned),
            "Task already fully signed"
        );

        // Crear el mensaje hash
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                task.id,
                task.employer,
                task.employee,
                task.bounty,
                task.agreementHash
            )
        );

        // Usar ECDSA para recuperar la firma
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);

        require(signer == msg.sender, "Invalid signature");

        if (msg.sender == task.employer) {
            require(!task.employerSigned, "Employer already signed");
            task.employerSigned = true;
            emit TaskSigned(_taskId, msg.sender, "employer");
        } else {
            require(!task.employeeSigned, "Employee already signed");
            task.employeeSigned = true;
            emit TaskSigned(_taskId, msg.sender, "employee");
        }

        if (task.employerSigned && task.employeeSigned) {
            emit TaskStarted(_taskId);
        }
    }

    function requestCompletion(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(
            msg.sender == task.employee,
            "Only the employee can request completion"
        );
        require(
            task.employerSigned && task.employeeSigned,
            "Task not fully signed"
        );
        require(!task.completed, "Task already completed");

        emit CompletionRequested(_taskId);
    }

    function completeTask(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(
            msg.sender == task.employer,
            "Only the employer can complete the task"
        );
        require(
            task.employerSigned && task.employeeSigned,
            "Task not fully signed"
        );
        require(!task.completed, "Task already completed");

        task.completed = true;
        emit TaskCompleted(_taskId);
    }

    function releaseFunds(uint256 _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(
            msg.sender == task.employer,
            "Only the employer can release funds"
        );
        require(task.completed, "Task not completed");
        require(!task.fundReleased, "Funds already released");

        task.fundReleased = true;
        payable(task.employee).transfer(task.bounty);

        emit FundsReleased(_taskId, task.employee, task.bounty);
    }

    function getTask(uint256 _taskId) external view returns (Task memory) {
        return tasks[_taskId];
    }
}
