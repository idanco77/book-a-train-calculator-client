declare const swal: any;

export class NotificationService {

  public success(title: string, text?: string): void {

    const options = {
      icon: 'success',
      position: 'center',
      title,
      text: text ? text : '',
      confirmButtonText: 'אישור',
      timer: 2500
    };

    swal.fire(options);
  }

  public error(text?: string, title?: string): void {
    const options = {
      icon: 'error',
      title: title ? title : 'אירעה שגיאה',
      text,
      confirmButtonText: 'סגור'
    };

    swal.fire(options);
  }
}
