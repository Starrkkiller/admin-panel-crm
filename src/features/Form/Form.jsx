import dropdownSelectorStyles from "./StatusSelectorByModal/StatusSelectorByModal.module.css";
import styles from "./Form.module.css";
import dropdownCloseApproverStyle from "./DropdownCloseApprover/DropdownCloseApprover.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValue, resetForm } from "../store/Form/formSlice";
import { Button } from "../../elements/Button/Button";
import { MyDropdown } from "../../elements/Dropdown/MyDropdown";
import { StatusSelectorByModal } from "./StatusSelectorByModal/StatusSelectorByModal";
import { DropdownCloseApprover } from "./DropdownCloseApprover/DropdownCloseApprover";
import cn from "classnames";
import { Input } from "../../elements/Input/Input";
import { OrderDetail } from "./OrderDetail/OrderDetail";
import { statusNames } from "../../App";
import { getFormData, getOrderByID } from "../store/selectors";
import updateOrder from "./../store/Form/formAction";

const confirmationCode = "123";

export function Form() {
  const { confirmationCodeValue, id, date, status, loyalty, fullName } =
    useSelector(getFormData);

  const order = useSelector(getOrderByID(id));
  const checkDataChanged = () => {
    return !(order?.status === status && order?.fullName === fullName);
  };
  const isDataChanged = checkDataChanged();

  const [errors, setErrors] = useState({ code: "", name: "" });

  const [isSelectorDropdownVisible, setIsSelectorDropdownVisible] =
    useState(false);

  const validateErrors = () => {
    const errors = { code: "", name: "" };
    if (fullName.trim().length === 0) {
      errors.name = "поле ФИО заполнено неверно";
    }
    if (confirmationCodeValue !== confirmationCode) {
      errors.code = "поле код заполнено неверно";
    }
    console.log(errors);
    setErrors(errors);
    return errors;
  };

  useEffect(() => {
    setErrors({ ...errors, name: "" });
  }, [fullName]);
  useEffect(() => {
    setErrors({ ...errors, code: "" });
  }, [confirmationCodeValue]);

  const dispatch = useDispatch();
  const createHandleValueChanger =
    (valueName, additionalReset) =>
    ({ target: { value } }) => {
      if (additionalReset) {
        additionalReset();
      }
      dispatch(changeValue({ valueName, newValue: value }));
    };

  const handleCloseModal = () => {
    dispatch(resetForm());
    setIsApproveDropdownVisible(false);
  };

  const handleToggleSelectorVisibility = () => {
    setIsSelectorDropdownVisible(!isSelectorDropdownVisible);
  };
  const [isApproveDropdownVisible, setIsApproveDropdownVisible] =
    useState(false);
  const handleToggleApproverVisibility = () => {
    if (isDataChanged) {
      setIsApproveDropdownVisible(!isApproveDropdownVisible);
    } else {
      handleCloseModal();
    }
  };

  const createHandleValueReset = (valueName) => () => {
    dispatch(changeValue({ valueName, newValue: "" }));
  };

  const handleChangeOrder = () => {
    const errors = validateErrors();
    if (!(errors.name || errors.code)) {
      dispatch(
        updateOrder({
          id: id,
          status: status,
          fullName: fullName,
        })
      );
      handleCloseModal();
    }
  };

  const triggerSelectorElement = <Button icon="arrow" />;

  const dropdownSelectorElement = (
    <MyDropdown
      externalVisibilityValue={isSelectorDropdownVisible}
      externalVisibilitySetter={handleToggleSelectorVisibility}
      trigger={triggerSelectorElement}
      childrenClassName={dropdownSelectorStyles._}
      triggerClassNameWithActiveTrigger={styles.flipped}
    >
      <StatusSelectorByModal onDropdownClose={handleToggleSelectorVisibility} />
    </MyDropdown>
  );

  const triggerApproveChangeElement = <Button icon="x-large" />;

  const dropdownApproveChangeElement = (
    <MyDropdown
      externalVisibilityValue={isApproveDropdownVisible}
      externalVisibilitySetter={handleToggleApproverVisibility}
      triggerClassName={styles.button}
      trigger={triggerApproveChangeElement}
      childrenClassName={dropdownCloseApproverStyle._}
    >
      <DropdownCloseApprover
        onDropdownClose={handleToggleApproverVisibility}
        onModalClose={handleCloseModal}
      />
    </MyDropdown>
  );

  return (
    <div className={styles._}>
      <div
        className={cn(styles.modalBackground, {
          [styles.active]: !!id,
        })}
      />

      <div className={cn(styles.modalForm, { [styles.active]: !!id })}>
        <div className={styles.header}>
          Заявка #{id}
          {dropdownApproveChangeElement}
        </div>
        <div className={styles.body}>
          <Input disabled value={date} label="Дата и время заказа" />
          <Input
            value={fullName}
            onChange={createHandleValueChanger("fullName")}
            onReset={createHandleValueReset("fullName")}
            label="ФИО покупателя"
            isIncorrect={!!errors.name}
          />
          <OrderDetail />
          <Input disabled value={loyalty} label="Уровень лояльности" />

          <Input
            value={statusNames[status]}
            readOnly
            label="Статус заказа"
            postfix={dropdownSelectorElement}
          />

          <Input
            label="Код подтверждения"
            value={confirmationCodeValue}
            onChange={createHandleValueChanger("confirmationCodeValue")}
            onReset={createHandleValueReset("confirmationCodeValue")}
            isIncorrect={!!errors.code}
          />
        </div>

        <div className={styles.footer}>
          {errors.name || errors.code || " "}
          <Button
            icon="checkmark"
            isSecondary={true}
            onClick={handleChangeOrder}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
