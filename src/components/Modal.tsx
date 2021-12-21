import clsx from 'clsx'

type ModalProps = {
  onCancel: React.MouseEventHandler<HTMLButtonElement>
  onDelete: React.MouseEventHandler<HTMLButtonElement>
}

export function Modal({ onCancel, onDelete }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:items-end sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div
          className={clsx(
            'inline-block text-left align-bottom sm:my-8 sm:align-middle sm:max-w-sm sm:w-full',
            'overflow-hidden transition-all transform',
            'bg-white rounded-lg shadow-xl'
          )}>
          <div className="pt-5 pb-4 bg-white px-7 sm:px-6 sm:py-8 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="mb-4 text-xl font-medium leading-6 text-gray-900"
                  id="modal-title">
                  Delete comment
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this comment? This
                    will remove the comment and can't be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-4 px-6 py-3 pb-8">
            <button
              onClick={onDelete}
              type="button"
              className={clsx(
                'inline-flex justify-center w-full px-2 sm:px-4 py-3 ml-0 sm:ml-3',
                'text-base font-medium sm:text-sm',
                'rounded-md shadow-sm',
                'text-white border border-transparent bg-red-soft hover:bg-red-pale',
                ' focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-pale'
              )}>
              YES, DELETE
            </button>
            <button
              onClick={onCancel}
              type="button"
              className={clsx(
                'inline-flex justify-center w-full px-2 sm:px-4 py-3 ml-0 sm:ml-3',
                'text-base font-medium rounded-md shadow-sm sm:text-sm',
                'text-white border border-gray-300 bg-blue-darker hover:bg-blue-dark',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              )}>
              NO, CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
